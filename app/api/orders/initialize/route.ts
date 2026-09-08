import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { featuredProducts } from "@/constants/products";

interface OrderItem {
  id: string;
  quantity: number;
}

interface OrderRequestBody {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };

  items: OrderItem[];
}

export async function POST(request: Request) {
  try {
    const body: OrderRequestBody = await request.json();

    const { customer, items } = body;

    if (
      !customer?.fullName ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city ||
      !customer?.state
    ) {
      return NextResponse.json(
        {
          message: "Please provide all customer information.",
        },
        {
          status: 400,
        }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          message: "Your cart is empty.",
        },
        {
          status: 400,
        }
      );
    }

    const orderItems = items.map((item) => {
      const product = featuredProducts.find(
        (product) => product.slug === item.id
      );

      if (!product) {
        throw new Error(
          `Product not found: ${item.id}`
        );
      }

      const quantity = Math.max(1, item.quantity);

      return {
        id: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
        subtotal: product.price * quantity,
      };
    });

    const subtotal = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

  
        const order = await prisma.order.create({
            data: {
                    fullName: customer.fullName,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                    city: customer.city,
                    state: customer.state,

                    currency: "NGN",
                    subtotal,
                    deliveryFee: 0,
                    total: subtotal,

                    status: "PENDING",

                    items: {
                    create: orderItems.map((item) => ({
                        productId: item.id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        quantity: item.quantity,
                        subtotal: item.subtotal,
                    })),
                    },
                },

                include: {
                    items: true,
                },
            });

    return NextResponse.json(
      {
        message: "Order initialized successfully.",
        order,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Order initialization error:", error);

    return NextResponse.json(
      {
        message: "Unable to initialize order.",
      },
      {
        status: 500,
      }
    );
  }
}
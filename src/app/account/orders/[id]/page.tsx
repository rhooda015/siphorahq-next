import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import { redirect } from "next/navigation";
import OrderTracking, { OrderTrackingData } from "@/components/account/OrderTracking";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Find the order in the database
  await connectDB();
  const orderDoc = await Order.findOne({ 
    $or: [
      { orderId: resolvedParams.id },
      { _id: resolvedParams.id.match(/^[0-9a-fA-F]{24}$/) ? resolvedParams.id : null }
    ]
  }).lean();

  if (!orderDoc) {
    // Return a generic/mocked OrderTrackingData if order is not found for preview purposes
    // Or you could return a 404. We'll use mock data to demonstrate the luxury UI.
    const mockData: OrderTrackingData = {
      orderId: resolvedParams.id || "SPH-98421",
      status: "packed",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 days
      cartItemCount: 2,
      product: {
        name: "Emerald Regent Fine Porcelain Set",
        collection: "The Imperial Series",
        image: "https://lh3.googleusercontent.com/aida/AP1WRLvJilvd4DAGPQIJUmgJCutZJW1wikX5GXdRfA-_nIQ2ZuoAvoR0C6VoIE1fYbODZBS4WetiZQEwzT3xdq6e7Vkr2WJbAqzX6S4dApdJWKn4RM_4BO65E8RKSaYBge501116uNlwxKffJRg1GN67d9tfePiJWwXmStFU1awCmbx9OExGE7BhtCzqtA5UP2plmqHLQv6hnRG8h2kYMZS6jkK8IK4H51ogxM8u7d1P5tUYV1ZrRgZ5D43sD4k",
        imageAlt: "Emerald Regent Set",
        craftsmanship: "Hand-painted 24k gold rims",
        detailing: "Translucent fine bone china",
        qualityNote: "This piece has passed our rigorous 5-point quality inspection and is certified authentic Siphora HQ porcelain.",
      },
      timeline: [
        {
          status: "confirmed",
          title: "Order Confirmed",
          icon: "receipt_long",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          description: "Your order has been received and verified.",
        },
        {
          status: "quality_check",
          title: "Quality Check",
          icon: "fact_check",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          description: "Each piece is being inspected by our specialists.",
        },
        {
          status: "packed",
          title: "Packed with Care",
          icon: "box",
          timestamp: new Date().toISOString(),
          description: "Your items are being secured in our signature Siphora HQ packaging.",
        },
        {
          status: "in_transit",
          title: "In Transit",
          icon: "local_shipping",
          timestamp: null,
          description: "Your masterpiece is on its way.",
        },
        {
          status: "delivered",
          title: "Delivered",
          icon: "home",
          timestamp: null,
          description: "Safely delivered to your address.",
        },
      ],
      courierTrackingHref: "#",
      recommendations: [
        {
          id: "rec1",
          name: "Emerald Regent Platter",
          price: 12500,
          image: "https://lh3.googleusercontent.com/aida/AP1WRLvJilvd4DAGPQIJUmgJCutZJW1wikX5GXdRfA-_nIQ2ZuoAvoR0C6VoIE1fYbODZBS4WetiZQEwzT3xdq6e7Vkr2WJbAqzX6S4dApdJWKn4RM_4BO65E8RKSaYBge501116uNlwxKffJRg1GN67d9tfePiJWwXmStFU1awCmbx9OExGE7BhtCzqtA5UP2plmqHLQv6hnRG8h2kYMZS6jkK8IK4H51ogxM8u7d1P5tUYV1ZrRgZ5D43sD4k",
          href: "/products/emerald-regent-platter",
        },
      ],
    };

    return <OrderTracking data={mockData} />;
  }

  // If real order data exists, we would map it here.
  // For now, mapping mock data around the real order ID:
  const orderData: OrderTrackingData = {
    orderId: orderDoc.orderId || resolvedParams.id,
    status: (orderDoc.status === "Delivered" ? "delivered" : "packed") as any, // Simple map
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    cartItemCount: orderDoc.items?.length || 0,
    product: {
      name: orderDoc.items?.[0]?.name || "Siphora HQ Fine Porcelain",
      collection: orderDoc.items?.[0]?.variant || "Premium Collection",
      image: orderDoc.items?.[0]?.image || orderDoc.items?.[0]?.img || "https://lh3.googleusercontent.com/aida/AP1WRLvJilvd4DAGPQIJUmgJCutZJW1wikX5GXdRfA-_nIQ2ZuoAvoR0C6VoIE1fYbODZBS4WetiZQEwzT3xdq6e7Vkr2WJbAqzX6S4dApdJWKn4RM_4BO65E8RKSaYBge501116uNlwxKffJRg1GN67d9tfePiJWwXmStFU1awCmbx9OExGE7BhtCzqtA5UP2plmqHLQv6hnRG8h2kYMZS6jkK8IK4H51ogxM8u7d1P5tUYV1ZrRgZ5D43sD4k",
      imageAlt: orderDoc.items?.[0]?.name || "Product Image",
      craftsmanship: "Authentic materials and finish",
      detailing: "Inspected by Siphora HQ",
      qualityNote: "This piece has passed our rigorous quality inspection.",
    },
    timeline: [
      {
        status: "confirmed",
        title: "Order confirmed",
        icon: "check",
        timestamp: orderDoc.createdAt ? new Date(orderDoc.createdAt).toISOString() : new Date().toISOString(),
        description: "Your order has been successfully received.",
      },
      {
        status: "packed",
        title: "Packed securely",
        icon: "inventory_2",
        timestamp: orderDoc.status === "Delivered" ? new Date().toISOString() : null,
        description: "Your porcelain piece has been packed with protective luxury packaging.",
      },
      {
        status: "quality_check",
        title: "Quality inspection",
        icon: "verified",
        timestamp: orderDoc.status === "Delivered" ? new Date().toISOString() : null,
        description: "Final breakage-safety and finish check is underway.",
      },
      {
        status: "in_transit",
        title: "In transit",
        icon: "local_shipping",
        timestamp: orderDoc.status === "Delivered" ? new Date().toISOString() : null,
        description: "Your order is on its way.",
      },
      {
        status: "delivered",
        title: "Delivered",
        icon: "home",
        timestamp: orderDoc.status === "Delivered" ? new Date().toISOString() : null,
        description: "Your order has arrived.",
      },
    ],
    courierTrackingHref: "#",
    recommendations: [],
  };

  return <OrderTracking data={orderData} />;
}

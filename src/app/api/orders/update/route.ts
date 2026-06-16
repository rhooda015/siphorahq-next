import { NextRequest, NextResponse } from "next/server";

const VALID_STATUSES = ["pending", "processing", "shipped", "delivered"];
const VALID_COURIERS = [
  "shiprocket", "delhivery", "bluedart", "ekart",
  "xpressbees", "dtdc", "shadowfax", "ecom", "other", ""
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status, courierPartner, trackingAwb, internalNotes, updatedAt } = body;

    // Validation
    if (!orderId) {
      return NextResponse.json({ success: false, message: "orderId is required" }, { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({
        success: false,
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      }, { status: 400 });
    }
    if (!VALID_COURIERS.includes(courierPartner)) {
      return NextResponse.json({ success: false, message: "Invalid courier partner" }, { status: 400 });
    }

    // TODO: Replace with your actual DB update (MongoDB / Prisma / Supabase etc.)
    // Example with Prisma:
    // const updated = await prisma.order.update({
    //   where: { id: orderId },
    //   data: { status, courierPartner, trackingAwb, internalNotes, updatedAt },
    // });

    const updated = {
      orderId,
      status,
      courierPartner,
      trackingAwb: trackingAwb || "",
      internalNotes: internalNotes || "",
      updatedAt: updatedAt || new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      order: updated,
    }, { status: 200 });

  } catch (err) {
    console.error("Order update error:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

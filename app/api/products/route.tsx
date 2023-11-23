import { NextRequest, NextResponse } from "next/server"
import schema from "./schema";
import prisma  from "@/prisma/client"

export async function GET(request: NextRequest) {

    const products = await prisma.product.findMany();

    return NextResponse.json(products)
}



export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status:400})
    
        const newProduct = await prisma.product.create({ //we await the call an get the product object
            data: {
                name: body.name,
                price: body.price
            }
        })

        return NextResponse.json(newProduct, { status: 201}) //we could do this: '...body' for name and price but a malicious user can send additional property that we don't want to accept

}


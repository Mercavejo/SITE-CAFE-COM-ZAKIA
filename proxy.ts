import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/jogos/sorteio/preencher") {
    return NextResponse.next();
  }

  const hasAccess =
    request.cookies.get("jogos_access")?.value === "5832" ||
    request.cookies.get("carfuk_access")?.value === "5832";
  if (hasAccess) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/jogos";
  url.searchParams.set("acesso", "senha");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/jogos/carfuk/:path*", "/jogos/sorteio/:path*", "/jogos/aceito-participar/:path*"],
};

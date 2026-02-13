import { readFileSync } from "node:fs";
import { join } from "node:path";
import { generate as DefaultImage } from "fumadocs-ui/og";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getPageImage, source } from "@/lib/source";

const logoData = readFileSync(join(process.cwd(), "public/avail_logo_new.png"));
const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage
      title={page.data.title}
      description={page.data.description}
      site="My App"
      icon={
        // biome-ignore lint/performance/noImgElement: ImageResponse does not support next/image
        <img src={logoBase64} alt="" width={56} height={56} />
      }
    />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}

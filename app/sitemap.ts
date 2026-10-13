import type { MetadataRoute } from "next";
import { cars, brand } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/inventory", "/app", ...cars.map((c) => "/inventory/" + c.id)].map((p) => ({ url: brand.url + p, lastModified: new Date() })); }

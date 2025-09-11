import type { DirectusUser } from "@directus/sdk";

export interface Schema {
  materials: Material[];
  projects: Project[];
  test: Test[];
  variants: Variant[];
  variants_materials: VariantMaterial[];
  variants_projects: VariantProject[];
}

export interface Material {
  id: number;
  user_created: string | DirectusUser<Schema> | null;
  date_created: string | null;
  user_updated: string | DirectusUser<Schema> | null;
  date_updated: string | null;
  unit: "kg" | "sqft" | "pack" | "yds" | "ft" | "unit" | null;
  name: string | null;
  supplier: string | null;
  options: Array<{ name: string; sku: string; cost_per_unit: number }> | null;
  sort: number | null;
}

export interface Project {
  id: string;
  user_created: string | DirectusUser<Schema> | null;
  date_created: string | null;
  user_updated: string | DirectusUser<Schema> | null;
  date_updated: string | null;
  name: string | null;
  hours: number | null;
  materials: Array<{ amount: number; material: { key: string; } }> | null;
  skills: Array<
    | "Snaps"
    | "Staples"
    | "Cutting Soft Leather"
    | "Dryad Bark Carving"
    | "Belt Roller"
    | "Cutting Veg Tan"
    | "Saddle Stitch"
    | "X Stitch"
    | "Machine Sewing"
    | "Complex Assembly"
    | "Hand Stamping"
    | "Press Stamping"
    | "Tooling Lines"
    | "Stain Shading"
    | "Tooling Lines with Bevels"
    | "Sheridan-style Tooling"
  > | null;
  sort: number | null;
}

export interface Test {
  id: string;
  sort: number | null;
  user_created: string | DirectusUser<Schema> | null;
  date_created: string | null;
  user_updated: string | DirectusUser<Schema> | null;
  date_updated: string | null;
}

export interface Variant {
  id: string;
  sort: number | null;
  user_created: string | DirectusUser<Schema> | null;
  date_created: string | null;
  user_updated: string | DirectusUser<Schema> | null;
  date_updated: string | null;
  shopify_variant: string | null;
  projects: string[] | VariantProject[];
}

export interface VariantMaterial {
  id: number;
  variants_id: string | Variant | null;
  materials_id: number | Material | null;
}

export interface VariantProject {
  id: number;
  variants_id: string | Variant | null;
  projects_id: string | Project | null;
}

// GeoJSON Types

export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface GeoJSONLineString {
  type: "LineString";
  coordinates: Array<[number, number]>;
}

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: Array<Array<[number, number]>>;
}

export interface GeoJSONMultiPoint {
  type: "MultiPoint";
  coordinates: Array<[number, number]>;
}

export interface GeoJSONMultiLineString {
  type: "MultiLineString";
  coordinates: Array<Array<[number, number]>>;
}

export interface GeoJSONMultiPolygon {
  type: "MultiPolygon";
  coordinates: Array<Array<Array<[number, number]>>>;
}

export interface GeoJSONGeometryCollection {
  type: "GeometryCollection";
  geometries: Array<
    | GeoJSONPoint
    | GeoJSONLineString
    | GeoJSONPolygon
    | GeoJSONMultiPoint
    | GeoJSONMultiLineString
    | GeoJSONMultiPolygon
  >;
}

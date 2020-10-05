export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  fileType: FileType;
  title: string;
  subtitle: string;
  widths: string[];
  heights: string[];
}

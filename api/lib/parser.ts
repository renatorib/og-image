import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { widths, heights, title, subtitle } = query || {};

  const [, extension = "png"] = (pathname || "/").slice(1).split(".");

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    title: decodeURIComponent(Array.isArray(title) ? title.join() : title),
    subtitle: decodeURIComponent(
      Array.isArray(subtitle) ? subtitle.join() : subtitle
    ),
    widths: getArray(widths),
    heights: getArray(heights),
  };

  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}

import { readFileSync } from "fs";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";

const ptsansregu = readFileSync(
  `${__dirname}/../fonts/PTSans-Regular.ttf`
).toString("base64");

const ptserifregu = readFileSync(
  `${__dirname}/../fonts/PTSerif-Regular.ttf`
).toString("base64");

const logoData =
  "data:image/png;base64,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";

function getCss() {
  return `
    @font-face {
      font-family: 'PT Sans';
      font-style:  normal;
      font-weight: normal;
      src: url(data:font/ttf;charset=utf-8;base64,${ptsansregu}) format('ttf');
    }

    @font-face {
      font-family: 'PT Serif';
      font-style:  normal;
      font-weight: normal;
      src: url(data:font/ttf;charset=utf-8;base64,${ptserifregu}) format('ttf');
    }

    body {
      background: #f3f8fb;
      height: 100vh;
      display: flex;
      align-items: center;
    }

    .cover {
      padding: 60px;
    }

    .header {
      position: absolute;
      top: 60px;
      left: 60px;
      display: flex;
      align-items: center;
      font-family: "PT Sans", sans-serif;
    }
    .header img {
      width: 80px;
      margin-right: 30px;
    }
    .header span {
      font-size: 60px;
    }
    
    .title {
      font-family: "PT Sans", sans-serif;
      font-size: 144px;
      color: #222222;
    }

    .subtitle {
      font-family: "PT Serif", serif;
      font-size: 62.4px;
      color: #5b6987;
      margin-top: 40px;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { title, subtitle } = parsedReq;

  return `<!DOCTYPE html>
    <html>
      <meta charset="utf-8">
      <title>Generated Image</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        ${getCss()}
      </style>
      <body>
        <div class="header">
          <img src="${logoData}" />
          <span>rena.to<strong>/blog</strong></span>
        </div>
        
        <div class="cover">
          <div class="title">
            ${sanitizeHtml(title)}
          </div>

          <div class="subtitle">
            ${sanitizeHtml(subtitle)}
          </div>
        </div>
      </body>
    </html>`;
}

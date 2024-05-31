import fs from "fs";
import Handlebars from "handlebars";

const BASE_PATH = "src/views/emails";

export function getHtmlContentFrom(template: string, data: any) {
  const layoutPath = `${BASE_PATH}/_layout.handlebars`;
  const layoutSource = fs.readFileSync(layoutPath, "utf8");
  const layoutTemplate = Handlebars.compile(layoutSource);

  const emailPath = `${BASE_PATH}/${template}.handlebars`;
  const emailSource = fs.readFileSync(emailPath, "utf8");
  const emailTemplate = Handlebars.compile(emailSource);

  const htmlContent = layoutTemplate({
    body: emailTemplate(data),
  });

  return htmlContent;
}

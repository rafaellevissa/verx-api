import path from "node:path";
import url from "node:url";

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + "/../",
  title: "Verx API",
  version: "1.0.0",
  description: "",
  tagIndex: 2,
  info: {
    title: "Verx API",
    version: "1.0.0",
    description: "API for Verx",
  },
  snakeCase: true,

  debug: false,
  ignore: ["/swagger", "/docs"],
  preferredPutPatch: "PUT",
  common: {
    parameters: {},
    headers: {},
  },
  securitySchemes: {},
  defaultSecurityScheme: "BearerAuth",
  persistAuthorization: true,
  showFullPath: false,
};
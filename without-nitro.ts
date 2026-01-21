import { readFile, stat } from "node:fs/promises";
import h3 from "./dist/server/entry-server.mjs";
import { H3Event, serve, serveStatic, toResponse } from "h3";
import { join } from "node:path";

serve(h3, {
  middleware: [
    async (r, next) => {
      const ev = new H3Event(r);
      if (!ev.url.pathname.startsWith("/_build")) return next();
      return toResponse(
        await serveStatic(ev, {
          indexNames: ["/index.html"],
          getContents: (id) => {
            return readFile(join("dist/client", id));
          },
          getMeta: async (id) => {
            const stats = await stat(join("dist/client", id)).catch(() => {});
            if (stats?.isFile()) {
              return {
                size: stats.size,
                mtime: stats.mtimeMs,
              };
            }
          },
        }),
        ev,
      );
    },
  ],
});

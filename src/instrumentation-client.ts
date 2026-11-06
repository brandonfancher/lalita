import { initBotId } from "botid/client/core";

// checkBotId() only recognizes requests to the paths listed here.
initBotId({
  protect: [{ path: "/api/contact", method: "POST" }],
});

import { initBotId } from "botid/client/core";

// checkBotId() only recognizes requests to the paths listed here. Server
// Actions POST to the page that renders them, so the contact form is protected
// by its page path rather than an API route.
initBotId({
  protect: [{ path: "/contact", method: "POST" }],
});

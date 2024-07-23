// const stripe = require("stripe")(
//   "pk_live_51N3dAPSFPooNZtZaueOcolxMfdsEQ2QmIMASeRghppr2acFhgyG89RU0JV2v1Z7Hm19b05f43xY7CAc2ZxzAnyXM00vLBV942c"
// );
//
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create({
//         line_items: [
//           {
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             price: "price_1NE5DPSBuQnJr5tOnimnWE85",
//             // quantity: 1,
//           },
//         ],
//         mode: "subscription",
//
//         success_url: `${req.headers.origin}/?success=true`,
//         cancel_url: `${req.headers.origin}/?canceled=true`,
//       });
//       res.redirect(303, session.url);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
//

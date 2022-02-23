/** @type {import('@sveltejs/kit').RequestHandler} */
import * as db from "../../static/db.json";
import crypto from "crypto";

export async function get() {
    const recomedation = db.menu[crypto.randomInt(0, 2)];
    return {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: recomedation
    }
};
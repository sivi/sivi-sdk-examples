import os
import json
import time
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

SIVI_API_URL = os.getenv("SIVI_API_URL", "https://api.sivi.ai")
SIVI_API_KEY = os.getenv("SIVI_API_KEY", "")
BASE_HEADERS = {
    "Content-Type": "application/json",
    "sivi-api-key": SIVI_API_KEY,
}


def sivi_get(endpoint, query_params=None):
    url = f"{SIVI_API_URL}{endpoint}"
    params = {}
    if query_params:
        params["queryParams"] = json.dumps(query_params)
    resp = requests.get(url, headers=BASE_HEADERS, params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()


def sivi_post(endpoint, body=None):
    url = f"{SIVI_API_URL}{endpoint}"
    resp = requests.post(url, headers=BASE_HEADERS, json=body or {}, timeout=30)
    resp.raise_for_status()
    return resp.json()


@app.route("/designs-from-prompt", methods=["POST"])
def designs_from_prompt():
    data = sivi_post("/general/designs-from-prompt", request.get_json())
    return jsonify(data)


@app.route("/designs-from-content", methods=["POST"])
def designs_from_content():
    data = sivi_post("/general/designs-from-content", request.get_json())
    return jsonify(data)


@app.route("/content-from-prompt", methods=["POST"])
def content_from_prompt():
    data = sivi_post("/general/content-from-prompt", request.get_json())
    return jsonify(data)


@app.route("/get-request-status", methods=["GET"])
def get_request_status():
    request_id = request.args.get("requestId")
    data = sivi_get("/general/get-request-status", {"requestId": request_id})
    return jsonify(data)


@app.route("/get-design-variants", methods=["GET"])
def get_design_variants():
    design_id = request.args.get("designId")
    data = sivi_get("/general/get-design-variants", {"designId": design_id})
    return jsonify(data)


@app.route("/update-webhook", methods=["POST"])
def update_webhook():
    body = request.get_json()
    webhook_url = body.get("webhookUrl") if body else None
    if not webhook_url or not isinstance(webhook_url, str):
        return jsonify({"error": "webhookUrl is required and must be a string"}), 400
    data = sivi_post("/general/update-webhook", {"webhookUrl": webhook_url})
    return jsonify(data)


@app.route("/designs-from-prompt-poll", methods=["POST"])
def designs_from_prompt_poll():
    submit_res = sivi_post("/general/designs-from-prompt", request.get_json())
    request_id = (
        submit_res.get("body", {}).get("requestId")
        or submit_res.get("requestId")
        or submit_res.get("data", {}).get("requestId")
    )
    if not request_id:
        return jsonify({"error": "No requestId returned", "raw": submit_res}), 500

    max_polls = 60
    delay = 10
    time.sleep(5)

    for i in range(1, max_polls + 1):
        status_res = sivi_get("/general/get-request-status", {"requestId": request_id})
        status = status_res.get("body", {}).get("status") or status_res.get("status")
        print(f"Poll {i}: status={status}")

        if status == "completed":
            return jsonify({"success": True, "requestId": request_id, "result": status_res})
        if status in ("failed", "error"):
            return jsonify({"success": False, "requestId": request_id, "result": status_res}), 500

        time.sleep(delay)

    return jsonify({"success": False, "requestId": request_id, "message": "Polling timeout exceeded"}), 500


@app.errorhandler(Exception)
def handle_error(e):
    print(f"Error: {e}")
    return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 4000))
    app.run(host="0.0.0.0", port=port)

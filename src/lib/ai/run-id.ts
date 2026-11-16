const LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

/**
 * Propagates the run ID the Lovable AI Gateway mints for one user request.
 *
 * The gateway creates the ID and returns it as `X-Lovable-AIG-Run-ID` on the
 * first response. This fetch wrapper replays that ID on every follow-up request
 * made while handling the same user request, including the AI SDK's automatic
 * tool-continuation calls, so all of them land in one run in the AI Gateway
 * request logs.
 *
 * Never mint a run ID in application code. Create the wrapper inside the
 * server request or job that makes the model calls, so each request gets its
 * own run and state.
 */
export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim() || undefined;

  return {
    getRunId: () => runId,
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);

      if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) {
        headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
      }

      const response = await fetch(input, { ...init, headers });

      // A request that starts the run receives its gateway-issued ID.
      runId ??= response.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || undefined;

      return response;
    },
  };
}

/** Returns the gateway-issued ID for the current server request, if one exists. */
export function getLovableAiGatewayRunId(
  headers: Headers,
  forwardedRunId?: string,
): string | undefined {
  return headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || forwardedRunId?.trim() || undefined;
}

/** Returns only the gateway run headers that are safe to expose to the browser. */
export function getLovableAiGatewayResponseHeaders(headers: Headers): Headers {
  const responseHeaders = new Headers();
  const runId = headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim();

  if (runId) {
    responseHeaders.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
  }

  return responseHeaders;
}

/** Adds the gateway-issued run ID for this server request to a JSON response. */
export function withLovableAiGatewayRunIdHeader(
  body: unknown,
  headers: Headers,
  status = 200,
): Response {
  return Response.json(body, {
    status,
    headers: getLovableAiGatewayResponseHeaders(headers),
  });
}

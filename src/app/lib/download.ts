"use server";

interface DownloadIds {
  hd: string | null;
  sd: string | null;
  mp3: string | null;
}

interface DownloadLinks {
  hd: string | null;
  sd: string | null;
  mp3: string | null;
}

interface ApiResponse {
  status: boolean;
  data?: string;
}

export interface DownloadResult {
  success: boolean;
  error?: string;
  links?: DownloadLinks;
}

const SAVETIKX_API = process.env.NEXT_PUBLIC_SAVETIKX_API;

const extractDownloadId = (html: string): DownloadIds => {
  // Regex to capture any ID format from the href attribute
  const hdMatch = html.match(
    /href="[^"]*dl\.php\?id=([a-zA-Z0-9]+)"[^>]*>[\s\S]*?Download\s*\(HD\)/
  );
  const sdMatch = html.match(
    /href="[^"]*dl\.php\?id=([a-zA-Z0-9]+)"[^>]*>[\s\S]*?Download\s*\(SD\)/
  );
  const mp3Match = html.match(
    /href="[^"]*dl\.php\?id=([a-zA-Z0-9]+)"[^>]*>[\s\S]*?Download\s*\(MP3\)/
  );

  return {
    hd: hdMatch ? hdMatch[1] : null,
    sd: sdMatch ? sdMatch[1] : null,
    mp3: mp3Match ? mp3Match[1] : null,
  };
};

export async function getDownloadLinks(url: string): Promise<DownloadResult> {
  if (!url.trim()) {
    return { success: false, error: "Please enter a TikTok URL" };
  }

  if (!url.includes("tiktok.com")) {
    return { success: false, error: "Please enter a valid TikTok URL" };
  }

  try {
    // IMPORTANT: Payload must be in exact order as specified
    const response = await fetch(
      `${SAVETIKX_API}/wp-json/visolix/api/download`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          format: "",
          captcha_response: null,
        }),
      }
    );

    const data: ApiResponse = await response.json();

    if (data.status && data.data) {
      const ids = extractDownloadId(data.data);

      if (!ids.hd && !ids.sd && !ids.mp3) {
        return {
          success: false,
          error: "Could not extract download links. Please try again.",
        };
      }

      // Build proper download URLs with countdown=0
      return {
        success: true,
        links: {
          hd: ids.hd
            ? `${SAVETIKX_API}/wp-content/plugins/visolix-video-downloader/dl.php?id=${ids.hd}&countdown=0`
            : null,
          sd: ids.sd
            ? `${SAVETIKX_API}/wp-content/plugins/visolix-video-downloader/dl.php?id=${ids.sd}&countdown=0`
            : null,
          mp3: ids.mp3
            ? `${SAVETIKX_API}/wp-content/plugins/visolix-video-downloader/dl.php?id=${ids.mp3}&countdown=0`
            : null,
        },
      };
    }

    return {
      success: false,
      error: "Failed to fetch download links. Please try again.",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "An error occurred. Please try again.",
    };
  }
}

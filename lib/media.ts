/**
 * Media utility helpers
 *
 * Shared helpers for determining media file types used by components
 * that render content from the TinaCMS media manager.
 */

const VIDEO_EXTENSIONS = /\.(mp4|m4v|mov|webm|ogg)(\?.*)?$/i;

/** Returns true if the given URL points to a video file. */
export function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.test(src);
}

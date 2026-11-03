/** Read the optional browser preference; opaque iframe origins may deny storage access. */
export function readStoredLocale(): string | null {
  try {
    return localStorage.getItem('locale');
  } catch (_storageUnavailable) {
    // The chart's locale context remains usable without browser storage.
    return null;
  }
}

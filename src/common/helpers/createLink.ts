export function createLink(location: HTMLLinkElement | Location) {
  return new URL(location.href).pathname.concat(
    new URL(location.href).hash,
    new URL(location.href).search,
  );
}

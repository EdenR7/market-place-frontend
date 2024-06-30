export function createAvatar(username, width) {
  return (
    <span className=" text-primary-110 font-semibold">
      {username[0].toUpperCase()}
    </span>
  );
}

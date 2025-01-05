const MAX_LEN = 5;

export function generateId() {
  let ans = "";
  const subset = "1234567890qwertyuiopljhgfdsazxcvbnm";
  for (let i = 0; i < MAX_LEN; i++) {
    ans += subset.charAt(Math.floor(Math.random() * subset.length));
  }
  return ans;
}

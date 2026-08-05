import { check } from "./utils/check"

class RandomizedSet {
  private values: number[] = [];
  private indices = new Map<number, number>();

  insert(val: number): boolean {
    if (this.indices.has(val)) {
      return false;
    }

    this.indices.set(val, this.values.length);
    this.values.push(val);

    return true;
  }

  remove(val: number): boolean {
    const index = this.indices.get(val);

    if (index === undefined) {
      return false;
    }

    const lastIndex = this.values.length - 1;
    const lastValue = this.values[lastIndex];

    // Move the last element into the removed element's position.
    this.values[index] = lastValue;
    this.indices.set(lastValue, index);

    this.values.pop();
    this.indices.delete(val);

    return true;
  }

  getRandom(): number {
    const index = Math.floor(Math.random() * this.values.length);
    return this.values[index];
  }
}/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

{
  const rand = new RandomizedSet()

  console.log("init", rand)
  rand.insert(1)

  console.log("inert 1", rand)
  rand.insert(3)
  rand.insert(22)
  rand.insert(5)
  rand.insert(2)

  console.log("all inert", rand)
  const res = rand.getRandom()
  console.log("getRandom", res)

  console.log(rand)
  rand.remove(2)
  console.log(rand)

}

export { }

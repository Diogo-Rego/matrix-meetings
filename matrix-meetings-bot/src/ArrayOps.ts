/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class ArrayOps<T> {
  constructor(readonly array: Readonly<T[]>) {}

  /**
   * Partitions array into Map based on key function.
   * @param key - function to evaluate key from array item
   * @return Map that maps key to items array
   */
  groupBy<K>(key: (item: T) => K): Map<K, T[]> {
    const map = new Map<K, T[]>();
    for (const item of this.array) {
      const keyValue = key(item);
      let group = map.get(keyValue);
      if (!group) {
        group = [];
      }
      group.push(item);
      map.set(keyValue, group);
    }
    return map;
  }
}

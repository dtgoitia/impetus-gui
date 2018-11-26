# Domain

Objects:
```
Timer:
- description (str)
- time (int)  milliseconds
- is_work (bool)
- pause_before_start (bool)
```
```
Loop:
- description (str)
- rounds (int)
- entries (Array<Timer>)
```
```
Set = Timer | Loop
```
```
Preset:
- name (str)
- summary (str)
- sets (Array<Set>)
```

## Data structure

**PRESET TABLE**

| id  | name         | summary |
| --- | ------------ | ------- |
| 1   | "2018-10-12" | ""      |
| 2   | "2018-10-13" | ""      |

`sets`: list of set ids, serialized and separated by commas

**ENTRY TABLE**

| id  | type | set_id | preset | order |
| --- | ---- | ------------- | ------ | ----- |
| 1   | 0    | 1             | 1      | 1     |
| 2   | 1    | 1             | 1      | 2     |
| 3   | 0    | 2             | 1      | 3     |

`set_id`: id of  a set (either a `timer` or a `loop`), depending on the type
`type`:
- `0`: `timer` type entry
- `1`: `loop` type entry

- `order` enforces the sorting of the `entry`s for each `preset`.


**LOOP TABLE**

| id  | description  | rounds |
| --- | ------------ | ------ |
| 1   | "Lower body" | 3      |

**LOOP-TIMER TABLE**

| loop_id | timer_id | order |
| ------- | -------- | ----- |
| 1       | 2        | 1     |
| 1       | 3        | 2     |

`order` the row order enforces the sorting of the `timer`s for each `loop`.

**TIMER TABLE**

| id  | description | time  |
| --- | ----------- | ----- |
| 1   | "Squats"    | 5000  |
| 2   | "Push ups"  | 5000  |
| 3   | "Rest"      | 5000  |
| 4   | "Rest"      | 15000 |
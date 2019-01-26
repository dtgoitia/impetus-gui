The purpose of this file is to have a complete schema of the State documented
```json
{
  todos: [...],
  presets: {
    presetPreviews: [
      {
        id: number,
        name: string,
        summary: string,
        preset: string
      },
      ...
    ],
    selectedPreset: null | number,
    presets: [
      {
        id: number,
        data: ILoopEntry | IWorkRestEntry,
        indentation: number,
        rounds: number,
        type: string
      },
      ...
    ]
  }
}
```
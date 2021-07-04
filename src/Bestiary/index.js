import Editor from './editor.marko'
import Viewer from './viewer.marko'
import { BestiaryEntrySchema } from './schemata/bestiary.js'

export default {
  match: [
    {
      type: /pathfinder-bestiary/g, 
      version: '1.x',
    },
    {
      type: /bestiary/g, 
      version: '*',
    }
  ],
  editor: Editor,
  viewer: Viewer,
  schema: BestiaryEntrySchema,
}

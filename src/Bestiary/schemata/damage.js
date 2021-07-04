import schisma from 'schisma'

const DamageSchema = schisma({
  dice: Number,
  pips: Number,
  bonus: Number,
  types: [String],
})

export default DamageSchema
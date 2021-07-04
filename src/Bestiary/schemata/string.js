import schisma from 'schisma'

const StringSchema = schisma({
  $type: String,
  $validate: v => {
    if (v == '') return 'field must not be empty'
  },
})

export default StringSchema
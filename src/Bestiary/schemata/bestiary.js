import schisma from 'schisma'

import HitPipsSchema from './hitpips.js'
import StringSchema from './string.js'
import DamageSchema from './damage.js'

export const PercentageSchema = schisma({
  $type: Number,
  $validate: v => {
    if (v < 0) {
      return 'cannot be less than 0'
    } else if (v > 100) {
      return 'cannot be more than 100'
    }
  },
  $conform: v => {
    return Math.round(v)
  },
})

export const ACSchema = schisma({
  type: {
    $type: String,
    $default: 'armor',
    $validate: v => {
      if (typeof v !== "string" && !(v instanceof String)) return 'field must be a string'
      const types = ['armor', 'deflection', 'dodge', 'enhancement', 'insight', 'luck', 'natural', 'profane', 'sacred', 'shield', 'size']
      if (![types].includes(v)) return `field must be ${types.map(r=>"'"+r+"'").join(', ')}`
    }
  },
  value: Number,
})

export const SizeSchema = schisma({
  $type: String,
  $default: 'medium',
  $validate: v => {
    if (typeof v !== "string" && !(v instanceof String)) return 'field must be a string'
    if (!['fine', 'diminutive', 'tiny', 'small', 'medium', 'large', 'huge', 'gargantuan', 'colossal'].includes(v)) return "field must be 'fine', 'diminutive', 'tiny', 'small', 'medium', 'large', 'huge', 'gargantuan', 'colossal'"
  },
})

export const BABSchema = schisma({
  $type: Number,
  $default: 0.75,
  $validate: v => {
    if (v < 0) return 'field must be greater than 0'
    if (isNaN(v)) return 'field must be a number'
    if (![0.5,0.75,1].includes(v)) return 'field must be 0.5, 0.75, or 1'
  },
})

export const AlignmentSchema = schisma({
  moral: {
    $type: String,
    $default: 'neutral',
    $validate: v => {
      if (typeof v !== "string" && !(v instanceof String)) return 'field must be a string'
      if(!['good', 'neutral', 'evil'].includes(v)) return "field must be 'good', 'neutral', or 'evil'"
    },
  },
  law: {
    $type: String,
    $default: 'neutral',
    $validate: v => {
      if (typeof v !== "string" && !(v instanceof String)) return 'field must be a string'
      if(!['lawful', 'neutral', 'chaotic'].includes(v)) return "field must be 'lawful', 'neutral', or 'chaotic'"
    },
  },
})

export const SaveSchema = schisma({
  $type: String,
  $default: 'bad',
  $validate: v => {
    if (typeof v !== "string" && !(v instanceof String)) return 'field must be a string'
    if (!['good','bad'].includes(v)) return "field must be 'good' or 'bad'"
  },
})

export const BestiaryLevelSchema = schisma({
  class: StringSchema,
  level: {
    $type: 1,
    $validate: v => {
      if (v < 0) return 'level must be greater than 0'
      if (isNaN(v)) return 'level must be a number'
    },
  },
  favored: Boolean,
  prestige: Boolean,
  hitpips: HitPipsSchema,
  bab: BABSchema,
  saves: {
    fortitude: SaveSchema,
    reflex: SaveSchema,
    will: SaveSchema,
  },
})

export const BestiaryFeatModifierSchema = schisma({
  dot: String,
  value: {
    $typeof: [Number, String],
  },
})

export const BestiaryFeatSchema = schisma({
  name: StringSchema,
  modifies: [BestiaryFeatModifierSchema],
})

export const BestiaryItemModifierSchema = schisma({
  dot: String,
  value: {
    $typeof: [Number, String],
  },
})

export const BestiaryItemTypeSchema = schisma({
  $type: String,
  $default: '',
  $validate: v => {
    if (typeof v !== "string" && !(v instanceof String)) return 'field must be a string'
    if (!['weapon', 'armor', 'magic item', 'wealth', 'misc'].includes(v)) return "field must be 'weapon', 'armor', 'magic item', 'wealth', 'misc'"
  },
})

export const BestiaryItemWeaponSchema = schisma({
  type: 'weapon',
  equipped: Boolean,
  attacks: Boolean,
  enchantment: Number,
  attack: Number,
  damage: {
    dice: Number,
    hitpips: HitPipsSchema,
  },
})

export const BestiaryItemArmorSchema = schisma({
  type: 'armor',
  equipped: Boolean,
  enchantment: Number,
  maxdexbonus: -1,
  armorcheckpenalty: Number,
  spellfailure: PercentageSchema,
  speed: Number,
  weight: Number,
  cost: Number,
})

export const BestiaryItemMagicItemSchema = schisma({
  type: 'magic item',
  equipped: Boolean,
})

export const BestiaryItemGoodsSchema = schisma({
  type: 'goods',
})

export const BestiaryItemWealthSchema = schisma({
  type: 'wealth',
})

export const BestiaryItemSchema = schisma({
  name: StringSchema,
  properties: {
    $typeof: [BestiaryItemMagicItemSchema, BestiaryItemGoodsSchema, BestiaryItemWeaponSchema, BestiaryItemArmorSchema, BestiaryItemWealthSchema],
  },
  modifies: [BestiaryItemModifierSchema],
})

export const BestiaryLanguageSchema = schisma({
  name: StringSchema,
  distance: 0, // Only used if name == telepathy
})

export const BestiarySkillSchema = schisma({
  name: StringSchema,
  value: Number,
})

export const BestiaryMeleeSchema = schisma({
  name: StringSchema,
  attacks: Number,
  tohit: Number,
  damage: [DamageSchema],
})

export const BestiarySpellSchema = schisma({
  name: StringSchema,
  dc: {
    $type: Number,
    $required: false,
  },
  extra: String,
  // TODO: summons
})

export const BestiaryTreasureSchema = schisma({
  combatgear: Boolean,
  value: {
    $type: String,
    $validate: v => {
      const types = ['standard', 'double', 'triple', 'incidental', 'none', 'npc']
      if (!types.includes(v)) return `field must be ${types.map(v=>`'${v}'`).join(', ')}`
    }
  },
  extra: [BestiaryItemSchema]
})

export const BestiaryEntrySchema = schisma({
  type: 'pathfinder-bestiary',
  version: '1.0',
  name: StringSchema,
  description: '',
  race: [String],
  size: SizeSchema,
  alignment: AlignmentSchema,
  // Defense
  "natural ac": Number,
  hitdice: 1,
  hitpips: HitPipsSchema,
  bab: BABSchema,
  levels: [BestiaryLevelSchema],
  saves: {
    fortitude: SaveSchema,
    reflex: SaveSchema,
    will: SaveSchema,
  },
  dr: [{
    $type: {
      value: Number,
      bypass: String,
    },
  }],
  immune: [String],
  resist: [{
    $type: {
      type: String,
      value: Number,
    }
  }],
  sr: Number,
  // Offense
  speed: {
    $type: Number,
    $default: 30,
  },
  melee: [BestiaryMeleeSchema],
  "special attacks": [String],
  "spell-like abilities": {
    cl: Number,
    concentration: Number,
    constant: [BestiarySpellSchema],
    "at will": [BestiarySpellSchema],
    "3/day": [BestiarySpellSchema],
    "1/day": [BestiarySpellSchema],
  },
  // Statistics
  "ability scores": {
    str: 10,
    dex: 10,
    con: 10,
    wis: 10,
    int: 10,
    cha: 10,
  },
  cmb: Number,
  cmd: Number,
  feats: [BestiaryFeatSchema],
  items: [BestiaryItemSchema],
  skills: [BestiarySkillSchema],
  languages: [BestiaryLanguageSchema],
  // Ecology
  environment: [String],
  organization: [String],
  treasure: BestiaryTreasureSchema
})

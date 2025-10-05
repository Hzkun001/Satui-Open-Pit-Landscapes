// Image exports for the Satui StoryMap project
export { default as floodingAerial } from './flooding-aerial';
export { default as roadDamage } from './road-damage';  
export { default as openPitMining } from './open-pit-mining';
export { default as floodedVillage } from './flooded-village';
export { default as miningVillage } from './mining-village';
export { default as satuiVillage } from './satui-village';
export { default as sarImage2015 } from './sar-2015';
export { default as sarImage2025 } from './sar-2025';
export { default as miningAerialTerraced } from './mining-aerial-terraced';
export { default as mining1 } from './mining1';
export { default as mining2 } from './mining2';
export { default as satuiAerialMining } from './satui-aerial-mining';
export { default as seasonalWaterDry } from './seasonal-water-dry';
export { default as seasonalWaterWet } from './seasonal-water-wet';
export { default as coastalErosion } from './coastal-erosion';

// Image metadata
export const imageMetadata = {
  floodingAerial: {
    name: 'Flooding Aerial View',
    description: 'Aerial view of flooded residential area during wet season showing houses and vegetation surrounded by water',
    category: 'environmental-impact',
    type: 'aerial-photography'
  },
  roadDamage: {
    name: 'Road Infrastructure Damage', 
    description: 'Ground-level view showing damaged road infrastructure with visible erosion and repair work',
    category: 'infrastructure-impact',
    type: 'ground-photography'
  },
  openPitMining: {
    name: 'Open-Pit Mining Operation',
    description: 'Aerial view of large-scale open-pit coal mining operation showing excavated areas and mining infrastructure',
    category: 'mining-operations',
    type: 'aerial-photography'
  },
  floodedVillage: {
    name: 'Flooded Village Community',
    description: 'Aerial view of village community during extreme flooding, showing colorful houses surrounded by muddy floodwater',
    category: 'environmental-impact',
    type: 'aerial-photography'
  },
  miningVillage: {
    name: 'Mining Adjacent Village',
    description: 'Aerial view of residential area near mining operations showing houses, cleared land, and the impact of mining proximity on local communities',
    category: 'community-impact',
    type: 'aerial-photography'
  },
  satuiVillage: {
    name: 'Satui Village Center',
    description: 'Aerial view of Satui village center showing the prominent mosque with green domes, residential houses, and the flowing river through the community',
    category: 'location-context',
    type: 'aerial-photography'
  },
  sarImage2015: {
    name: 'SAR Image March 2015',
    description: 'Sentinel-1 SAR backscatter image of Satui mining area from March 31, 2015, showing the landscape before major mining expansion',
    category: 'sar-analysis',
    type: 'satellite-radar'
  },
  sarImage2025: {
    name: 'SAR Image October 2025',
    description: 'Sentinel-1 SAR backscatter image of Satui mining area from October 3, 2025, showing dramatic landscape changes after 10 years of mining expansion',
    category: 'sar-analysis',
    type: 'satellite-radar'
  },
  miningAerialTerraced: {
    name: 'Terraced Mining Operation Aerial',
    description: 'Aerial view of terraced open-pit mining operation showing multiple excavation levels, water accumulation pools, and the systematic extraction pattern typical of large-scale coal mining',
    category: 'mining-operations',
    type: 'aerial-photography'
  },
  mining1: {
    name: 'Multi-Level Mining Excavation',
    description: 'Aerial view of massive open-pit mining operation showing multiple excavation terraces, extensive earthwork, and the scale of industrial mining operations in tropical landscape',
    category: 'mining-operations',
    type: 'aerial-photography'
  },
  mining2: {
    name: 'Mining Landscape with Water Body',
    description: 'Natural landscape view showing a turquoise water body surrounded by exposed earth slopes and vegetation, illustrating the environmental transformation in mining areas',
    category: 'environmental-impact',
    type: 'landscape-photography'
  },
  satuiAerialMining: {
    name: 'Satui Aerial Mining Overview',
    description: 'Dramatic aerial view of Satui open-pit mining operation showing the massive scale of excavated areas, terraced mining levels, infrastructure development, and the relationship between industrial mining and surrounding landscape',
    category: 'mining-operations',
    type: 'aerial-photography'
  },
  seasonalWaterDry: {
    name: 'Seasonal Water - Dry Season',
    description: 'SAR-derived water mask showing pit water coverage during dry season (June-September) with minimal water accumulation in mining pits',
    category: 'seasonal-analysis',
    type: 'satellite-analysis'
  },
  seasonalWaterWet: {
    name: 'Seasonal Water - Wet Season', 
    description: 'SAR-derived water mask showing pit water coverage during wet season (November-May) with extensive water accumulation in mining pits due to monsoon rains',
    category: 'seasonal-analysis',
    type: 'satellite-analysis'
  },
  coastalErosion: {
    name: 'Coastal Erosion Impact',
    description: 'Coastal area showing environmental impact and erosion patterns along waterfront areas, illustrating the broader ecological effects of mining activities',
    category: 'environmental-impact',
    type: 'landscape-photography'
  }
};
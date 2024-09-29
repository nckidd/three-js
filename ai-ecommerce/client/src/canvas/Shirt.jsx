import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

const Shirt = () => {
  const snap = useSnapshot(state)

  /* import 3d model */
  const { nodes, materials } = useGLTF('/shirt_baked.glb') /* insert custom glb here */
  const logoTexture = useTexture(snap.logoDecal) 
  const fullTexture = useTexture(snap.fullDecal) 

  {/* use easing to apply color smoothly, not chromatically */}
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  {/* render model whenever state changes */}
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>

      {/* mesh of shirt */}
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry} /* geometry value specific to glb */
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* determine if shirt has color and/or logo texture */}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}   
      </mesh>
    </group>
  )
}

export default Shirt
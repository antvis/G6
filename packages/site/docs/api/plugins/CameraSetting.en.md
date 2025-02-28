---
title: CameraSetting
---

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### aspect

> _number \| 'auto'_

Camera viewport aspect ratio, only valid in perspective camera.

- number : Specific aspect ratio

- `'auto'` : Automatically set to the aspect ratio of the canvas

### azimuth

> _number_

Azimuth

### cameraType

> _'orbiting' \| 'exploring' \| 'tracking'_

Camera type

- `'orbiting'`: Fixed viewpoint, change camera position

- `'exploring'`: Similar to orbiting, but allows the camera to rotate between the North Pole and the South Pole

- `'tracking'`: Fixed camera position, change viewpoint

### distance

> _number_ **Default:** `500`

The distance from the camera to the target

### elevation

> _number_

Elevation

### far

> _number_

The position of the far plane

### fov

> _number_

Camera field of view, only valid in perspective camera

### maxDistance

> _number_

Maximum distance

### minDistance

> _number_

Minimum distance

### near

> _number_

The position of the near plane

### projectionMode

> _'perspective' \| 'orthographic'_

Projection mode, perspective projection is only valid in 3D scenes

- `'perspective'` : perspective projection

- `'orthographic'` : Orthogonal projection

### roll

> _number_

Roll

## API

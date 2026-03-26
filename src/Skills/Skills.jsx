import React, { useEffect, useMemo, useRef, useState } from 'react';
import awsLogo from '../assets/aws.svg';
import javaLogo from '../assets/java.svg';

const skills = [
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Java', logo: javaLogo, imageScale: 0.6 },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'React Native', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
  { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { name: 'FastAPI', logo: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'AWS', logo: awsLogo },
  { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'Jenkins', logo: 'https://cdn.simpleicons.org/jenkins/D24939' },
  { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const rotatePoint = (point, rotationX, rotationY) => {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;

  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const y2 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
};

const projectPoint = (point, width, height, radius) => {
  const perspective = radius * 3.2;
  const scale = perspective / (perspective - point.z);

  return {
    x: width / 2 + point.x * scale,
    y: height / 2 + point.y * scale,
    depth: (point.z + radius) / (radius * 2),
    scale,
  };
};

const createSpherePoints = (count, radius) =>
  Array.from({ length: count }, (_, index) => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

    return {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    };
  });

const createEdgePairs = (points, nearest = 3) => {
  const pairSet = new Set();

  points.forEach((point, sourceIndex) => {
    const neighbors = points
      .map((target, targetIndex) => {
        if (sourceIndex === targetIndex) {
          return null;
        }

        const dx = point.x - target.x;
        const dy = point.y - target.y;
        const dz = point.z - target.z;
        return { targetIndex, distance: dx * dx + dy * dy + dz * dz };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, nearest);

    neighbors.forEach(({ targetIndex }) => {
      const a = Math.min(sourceIndex, targetIndex);
      const b = Math.max(sourceIndex, targetIndex);
      pairSet.add(`${a}-${b}`);
    });
  });

  return Array.from(pairSet, (pair) => pair.split('-').map(Number));
};

const sampleLatitude = (radius, lat, samples = 40) => {
  const y = lat * radius;
  const ringRadius = Math.sqrt(radius * radius - y * y);

  return Array.from({ length: samples }, (_, index) => {
    const angle = (Math.PI * 2 * index) / samples;
    return {
      x: ringRadius * Math.cos(angle),
      y,
      z: ringRadius * Math.sin(angle),
    };
  });
};

const sampleMeridian = (radius, lon, samples = 40) =>
  Array.from({ length: samples }, (_, index) => {
    const v = index / (samples - 1);
    const phi = -Math.PI / 2 + Math.PI * v;
    return {
      x: radius * Math.cos(phi) * Math.cos(lon),
      y: radius * Math.sin(phi),
      z: radius * Math.cos(phi) * Math.sin(lon),
    };
  });

const stars = [
  { x: 8, y: 9, size: 2.4 },
  { x: 16, y: 14, size: 1.2 },
  { x: 21, y: 48, size: 2.1 },
  { x: 28, y: 22, size: 1.3 },
  { x: 34, y: 67, size: 1.8 },
  { x: 42, y: 17, size: 1.1 },
  { x: 48, y: 44, size: 2.2 },
  { x: 57, y: 28, size: 1.2 },
  { x: 63, y: 61, size: 1.6 },
  { x: 69, y: 33, size: 1.2 },
  { x: 75, y: 10, size: 1.5 },
  { x: 82, y: 49, size: 2.1 },
  { x: 89, y: 24, size: 1.2 },
  { x: 93, y: 73, size: 1.7 },
  { x: 12, y: 76, size: 1.4 },
  { x: 24, y: 84, size: 2.3 },
  { x: 39, y: 90, size: 1.7 },
  { x: 51, y: 82, size: 1.3 },
  { x: 61, y: 92, size: 1.6 },
  { x: 73, y: 80, size: 1.2 },
  { x: 86, y: 88, size: 2.4 },
];

const Skills = () => {
  const globeRef = useRef(null);
  const dragRef = useRef({ active: false, pointerId: null, x: 0, y: 0 });
  const rotationRef = useRef({ x: -0.28, y: 0.65 });
  const velocityRef = useRef({ x: 0.00045, y: 0.00075 });
  const hoveredSkillNameRef = useRef(null);

  const [size, setSize] = useState({ width: 740, height: 620 });
  const [scene, setScene] = useState({ nodes: [], edges: [], latRings: [], lonRings: [] });
  const [hoveredSkillName, setHoveredSkillName] = useState(null);

  const radius = Math.min(245, Math.max(180, size.width * 0.28));
  const nodePoints = useMemo(() => createSpherePoints(skills.length, radius), [radius]);
  const meshPoints = useMemo(() => createSpherePoints(72, radius), [radius]);
  const meshEdgePairs = useMemo(() => createEdgePairs(meshPoints, 4), [meshPoints]);

  useEffect(() => {
    const element = globeRef.current;

    if (!element) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const nextWidth = entry.contentRect.width;
      const nextHeight = clamp(entry.contentRect.height, 420, 720);
      setSize({ width: nextWidth, height: nextHeight });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    let previousTime = performance.now();

    const buildPolyline = (samples, rotationX, rotationY) =>
      samples
        .map((sample) => rotatePoint(sample, rotationX, rotationY))
        .map((rotated) => projectPoint(rotated, size.width, size.height, radius))
        .map((projected) => `${projected.x.toFixed(2)},${projected.y.toFixed(2)}`)
        .join(' ');

    const latSamples = [-0.72, -0.36, 0, 0.38, 0.72].map((lat) => sampleLatitude(radius, lat));
    const lonSamples = [Math.PI / 4, (-2 * Math.PI) / 5].map((lon) => sampleMeridian(radius, lon));

    const animate = (timestamp) => {
      const delta = Math.min(32, timestamp - previousTime);
      previousTime = timestamp;

      if (!dragRef.current.active) {
        rotationRef.current.x = clamp(
          rotationRef.current.x + velocityRef.current.x * delta,
          -0.95,
          0.95
        );
        rotationRef.current.y += velocityRef.current.y * delta;

        velocityRef.current.x *= 0.996;
        velocityRef.current.y *= 0.996;

        if (Math.abs(velocityRef.current.y) < 0.00038) {
          velocityRef.current.y += 0.000008;
        }
      }

      const rotationX = rotationRef.current.x;
      const rotationY = rotationRef.current.y;

      const projectedNodes = nodePoints.map((basePoint, index) => {
        const rotated = rotatePoint(basePoint, rotationX, rotationY);
        const projected = projectPoint(rotated, size.width, size.height, radius);
        const depth = projected.depth;
        const isHovered = hoveredSkillNameRef.current === skills[index].name;

        let scale =
          depth > 0.66
            ? 1.02 + (depth - 0.66) * 1.1
            : depth > 0.34
              ? 0.74 + (depth - 0.34) * 0.92
              : 0.52 + depth * 0.45;
        let opacity = depth > 0.66 ? 1 : depth > 0.34 ? 0.54 + depth * 0.34 : 0.22 + depth * 0.3;

        if (isHovered) {
          scale *= 1.16;
          opacity = 1;
        }

        const logoSize = clamp(25 + projected.scale * 8.5, 18, 44);

        return {
          ...skills[index],
          x: projected.x,
          y: projected.y,
          z: rotated.z,
          depth,
          opacity,
          scale: clamp(scale, 0.48, 1.62),
          logoSize,
        };
      });

      const projectedMeshPoints = meshPoints
        .map((point) => rotatePoint(point, rotationX, rotationY))
        .map((rotated) => ({
          rotated,
          projected: projectPoint(rotated, size.width, size.height, radius),
        }));

      const projectedEdges = meshEdgePairs
        .map(([from, to]) => {
          const start = projectedMeshPoints[from];
          const end = projectedMeshPoints[to];
          return {
            x1: start.projected.x,
            y1: start.projected.y,
            x2: end.projected.x,
            y2: end.projected.y,
            opacity: clamp(
              ((start.projected.depth + end.projected.depth) / 2) * 0.52,
              0.12,
              0.42
            ),
          };
        });

      const latRings = latSamples.map((samples) => buildPolyline(samples, rotationX, rotationY));
      const lonRings = lonSamples.map((samples) => buildPolyline(samples, rotationX, rotationY));

      const nodesInZOrder = [...projectedNodes].sort((a, b) => a.z - b.z);

      setScene({
        nodes: nodesInZOrder,
        edges: projectedEdges,
        latRings,
        lonRings,
      });

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [meshEdgePairs, meshPoints, nodePoints, radius, size.height, size.width]);

  const hoveredSkill =
    hoveredSkillName && scene.nodes.length
      ? scene.nodes.find((node) => node.name === hoveredSkillName) || null
      : null;

  useEffect(() => {
    hoveredSkillNameRef.current = hoveredSkillName;
  }, [hoveredSkillName]);

  const onPointerDown = (event) => {
    dragRef.current.active = true;
    dragRef.current.pointerId = event.pointerId;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;

    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;

    rotationRef.current.y += deltaX * 0.0078;
    rotationRef.current.x = clamp(rotationRef.current.x - deltaY * 0.0063, -1.05, 1.05);

    velocityRef.current.y = deltaX * 0.00012;
    velocityRef.current.x = -deltaY * 0.0001;
  };

  const onPointerUp = (event) => {
    if (dragRef.current.pointerId === event.pointerId) {
      dragRef.current.active = false;
      dragRef.current.pointerId = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="skills-cosmos">
        <div className="skills-stars" aria-hidden="true">
          {stars.map((star, index) => (
            <span
              key={`${star.x}-${star.y}-${index}`}
              style={{ '--x': `${star.x}%`, '--y': `${star.y}%`, '--size': `${star.size}px` }}
            />
          ))}
        </div>

        <header className="skills-heading">
          <p>TECH STACK</p>
          <h2>
            My <span>Skills</span>
          </h2>
        </header>

        <div
          ref={globeRef}
          className="skills-globe-stage interactive"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="application"
          aria-label="Interactive spinning skills globe"
        >
          {hoveredSkill ? (
            <div
              className="skills-node-tooltip"
              style={{
                left: hoveredSkill.x,
                top: hoveredSkill.y,
              }}
            >
              {hoveredSkill.name}
            </div>
          ) : null}

          <svg className="skills-network" viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
            {scene.latRings.map((ring, index) => (
              <polyline key={`lat-${index}`} points={ring} className="sphere-lat" />
            ))}

            {scene.lonRings.map((ring, index) => (
              <polyline key={`lon-${index}`} points={ring} className="sphere-lon" />
            ))}

            {scene.edges.map((edge, index) => (
              <line
                key={`edge-${index}`}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                className="node-link"
                style={{ opacity: edge.opacity }}
              />
            ))}
          </svg>

          <div className="skills-node-layer" aria-hidden="true">
            {scene.nodes.map((node) => (
              <button
                key={node.name}
                className="skills-logo-node"
                type="button"
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.logoSize,
                  height: node.logoSize,
                  '--icon-scale': node.imageScale || 0.8,
                  opacity: node.opacity,
                  transform: `translate(-50%, -50%) scale(${node.scale})`,
                  zIndex: Math.round(10 + node.depth * 30),
                }}
                onMouseEnter={() => setHoveredSkillName(node.name)}
                onFocus={() => setHoveredSkillName(node.name)}
                onMouseLeave={() => setHoveredSkillName(null)}
                onBlur={() => setHoveredSkillName(null)}
                tabIndex={-1}
              >
                <img
                  src={node.logo}
                  alt={node.name}
                  loading="lazy"
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (image.dataset.fallbackApplied === '1') {
                      return;
                    }

                    image.dataset.fallbackApplied = '1';
                    image.src =
                      node.fallbackLogo || 'https://cdn.simpleicons.org/codeforces/6B7CFF';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <p className="skills-hint">Drag to rotate - Hover nodes for details</p>
      </div>
    </section>
  );
};

export default Skills;


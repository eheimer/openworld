-- Seed admin users for development
-- Password for both: "password"
-- Uses INSERT OR IGNORE to skip if username already exists from phase 1 data.

INSERT OR IGNORE INTO player (username, password, email, isAdmin, createdAt, updatedAt)
VALUES (
  'eric',
  'f06b1e2d52b06bce.f528fc6beb743b93d068cda24bb2c9a1196b3fec2d846a9027911d807dc2fe37b12b8aaf3ffffdbb606b5bc17d8197a336105c0a8c71293af5a4d4189abd0ac3',
  'eric@openworld.dev',
  1,
  datetime('now'),
  datetime('now')
);

INSERT OR IGNORE INTO player (username, password, email, isAdmin, createdAt, updatedAt)
VALUES (
  'joel',
  'b6beb15f9af15443.20e1524ca64c1dadc666f6a8ff0c84a28bbf9ddafc5780a13803de9b3bc987d0f2ea69dadff597df5a0ca2c1ab70347c64e681e6233b1491785ce238d4e0f656',
  'joel@openworld.dev',
  1,
  datetime('now'),
  datetime('now')
);

-- Ensure both users are admins and have known dev passwords
UPDATE player SET
  isAdmin = 1,
  password = 'f06b1e2d52b06bce.f528fc6beb743b93d068cda24bb2c9a1196b3fec2d846a9027911d807dc2fe37b12b8aaf3ffffdbb606b5bc17d8197a336105c0a8c71293af5a4d4189abd0ac3'
WHERE username IN ('eric', 'joel');

export enum Servers {
    hellmina,
    orukam,
}

export function getServersList() {
  const servers = [];
  for (const server in Servers) {
    const isValueProperty = Number(server) >= 0;
    if (isValueProperty) {
      servers.push(Servers[server]);
    }
  }

  return servers;
}

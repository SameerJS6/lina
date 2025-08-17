import type { PackageManager } from "@/lib/package-manager-store";

type CommandMapping = {
  npm: string[];
  pnpm: string[];
  yarn: string[];
  bun: string[];
};

const NPX_COMMAND_MAPPINGS: CommandMapping = {
  npm: ["npx"],
  pnpm: ["pnpm", "dlx"],
  yarn: ["yarn", "dlx"],
  bun: ["bun", "x"],
};

const PACKAGE_COMMAND_MAPPINGS: CommandMapping = {
  npm: ["npm", "install"],
  pnpm: ["pnpm", "add"],
  yarn: ["yarn", "add"],
  bun: ["bun", "install"],
};

function isNpxCommand(command: string): boolean {
  return command.startsWith("npx ");
}

export function convertNpmCommand(npmCommand: string): Record<PackageManager, string> {
  const parts = npmCommand.split(" ");
  const isNpx = isNpxCommand(npmCommand);

  if (isNpx) {
    return convertNpxStyle(parts);
  }

  const mappings = PACKAGE_COMMAND_MAPPINGS;

  if (!mappings) {
    // If we don't have specific mappings, keep the command as is for all managers
    return {
      npm: npmCommand,
      pnpm: npmCommand.replace("npm", "pnpm"),
      yarn: npmCommand.replace("npm", "yarn"),
      bun: npmCommand.replace("npm", "bun"),
    };
  }

  const commands: Record<PackageManager, string> = {} as Record<PackageManager, string>;

  Object.entries(mappings).forEach(([pm, prefixParts]) => {
    commands[pm as PackageManager] = [
      ...prefixParts,
      ...parts.slice(2), // Skip "npm" and the command itself
    ].join(" ");
  });

  return commands;
}

function convertNpxStyle(parts: string[]): Record<PackageManager, string> {
  const commands: Record<PackageManager, string> = {
    npm: parts.join(" "),
    pnpm: "",
    yarn: "",
    bun: "",
  };

  Object.entries(NPX_COMMAND_MAPPINGS).forEach(([pm, prefixParts]) => {
    if (pm === "npm") return;

    commands[pm as PackageManager] = [...prefixParts, ...parts.slice(1)].join(" ");
  });

  return commands;
}

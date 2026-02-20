import { writeFile, mkdir, access } from "fs/promises";
import { constants } from "fs";
import path from "path";
import { fetchRegistryIndex, resolveDependencies } from "../utils/registry";
import { confirm } from "../utils/prompts";

async function pathExists(p: string): Promise<boolean> {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p: string) {
  // mkdir with recursive already safe if folder exists
  await mkdir(p, { recursive: true });
}

async function installFiles(targetDir: string, component: any) {
  if (!component.files) return;

  for (const file of component.files) {
    const fileName = path.basename(file.path);
    let filePath = path.join(targetDir, fileName);

    // Special handling if file is index.tsx inside nested folder
    if (file.path.includes("/") && fileName === "index.tsx") {
      const componentFolder = path.join(targetDir, component.name);
      await ensureDir(componentFolder);
      filePath = path.join(componentFolder, "index.tsx");
    }

    await writeFile(filePath, file.content);
    console.log(`  ✓ ${path.relative(process.cwd(), filePath)}`);
  }
}

export async function add(componentName: string) {
  if (!componentName) throw new Error("Please specify a component name.");

  const targetDir = path.join(process.cwd(), "components/ui");
  await ensureDir(targetDir);

  console.log(`Checking registry for ${componentName}...`);

  const registryIndex = await fetchRegistryIndex();
  const entry = registryIndex.find((entry) => entry.name === componentName);

  if (!entry) {
    console.error(`Component ${componentName} not found in registry.`);
    console.log(
      `\nTip: You can use 'opscli scaffold ${componentName}' to create a new component from a template.`
    );
    return;
  }

  console.log(`Found ${componentName}. Resolving dependencies...`);
  const allComponents = await resolveDependencies(componentName, "default");

  const componentsToInstall: any[] = [];

  for (const component of allComponents) {
    const componentPath = path.join(targetDir, `${component.name}.tsx`);
    const folderPath = path.join(targetDir, component.name);
    const exists = (await pathExists(componentPath)) || (await pathExists(folderPath));

    if (component.name === componentName) {
      // Main component
      if (exists) {
        const overwrite = await confirm(
          `Component '${component.name}' already exists. Overwrite?`,
          false
        );
        if (overwrite) componentsToInstall.push(component);
      } else {
        componentsToInstall.push(component);
      }
      continue;
    }

    // Dependencies
    if (exists) {
      const shouldSkip = await confirm(
        `Dependency '${component.name}' already exists. Skip?`,
        true
      );
      if (!shouldSkip) componentsToInstall.push(component);
    } else {
      const shouldInstall = await confirm(
        `Install dependency '${component.name}'?`,
        true
      );
      if (shouldInstall) componentsToInstall.push(component);
    }
  }

  if (componentsToInstall.length === 0) {
    console.log("Nothing to install.");
    return;
  }

  console.log("\nInstalling...");
  for (const component of componentsToInstall) {
    console.log(`- ${component.name}...`);
    await installFiles(targetDir, component);
  }

  console.log(`\nSuccessfully added ${componentName} and its selected dependencies.`);
}
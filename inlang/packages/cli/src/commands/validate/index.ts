import { Command } from "commander";
import { getInlangProject } from "../../utilities/getInlangProject.js";
import { log } from "../../utilities/log.js";
import { projectOption } from "../../utilities/globalFlags.js";

export const validate = new Command()
  .command("validate")
  .description("Validate the inlang project settings file.")
  .requiredOption(projectOption.flags, projectOption.description)
  .action(validateCommandAction);

export async function validateCommandAction(args: { project: string }) {
  try {
    log.info("🔎 Validating the inlang project...");
    // if `getInlangProject` doesn't throw, the project is valid
    const project = await getInlangProject({ projectPath: args.project });

    const errors = await project.errors.get();
    if (errors.length > 0) {
      log.info("The project contains errors:");
      for (const error of errors) log.error(error);
      process.exit(1);
    }

    log.success("The project is valid!");
    process.exit(0);
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
}

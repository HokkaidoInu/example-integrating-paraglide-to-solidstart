import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import { pendingChangesAtom, projectAtom, selectedProjectPathAtom } from "../state.ts";
import { useAtom } from "jotai";
import clsx from "clsx";
import { handleDownload } from "../helper/utils.ts";
import { useEffect, useState } from "react";

const LixFloat = () => {
  const [pendingChanges] = useAtom(pendingChangesAtom);
  const [project] = useAtom(projectAtom);
  const [selectedProjectPath] = useAtom(selectedProjectPathAtom);

  const [pendingChangesWasEmpty, setPendingChangesWasEmpty] = useState(pendingChanges.length === 0);

  // SlideOut Animation for the LixFloat
  useEffect(() => {
    if (pendingChanges.length === 0 && !pendingChangesWasEmpty) {
      const lixfloat = document.querySelector(".lixfloat")
      lixfloat?.classList.remove("opacity-0")
      lixfloat?.classList.add("animate-slideOut")
      console.log("addAnimation")
      setTimeout(() => {
        lixfloat?.classList.remove("animate-slideout")
        lixfloat?.classList.add("opacity-0")
        setPendingChangesWasEmpty(true);
        console.log("removeAnimation")
      }, 500)
    } else {
      setPendingChangesWasEmpty(pendingChanges.length === 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingChanges]);

  return (
    <div className={clsx(
      "lixfloat z-30 sticky mx-auto bottom-8 w-[300px] my-8 opacity-0",
      pendingChanges.length > 0 && "animate-slideIn opacity-100",
      // "transition-all translate-y-8 duration-500"
    )}>
      <div className="z-20 p-1.5 w-full flex justify-between items-center rounded-lg bg-zinc-700 text-white shadow-xl">
        <Link to="/changes">
          <div className="flex items-center gap-2 flex-grow text-xs font-medium text-left text-white px-2 py-1 rounded transition-colors duration-150 hover:bg-[--sl-color-neutral-500] hover:cursor-pointer">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-5 min-w-[1.25rem] gap-2 py-2 px-1 rounded bg-[--sl-color-neutral-600]">
              <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-white">
                {pendingChanges.length}
              </p>
            </div>
            Changes
          </div>
        </Link>
        <SlButton
          size="small"
          variant="neutral"
          onClick={() => handleDownload(project, selectedProjectPath)}
        >
          <svg className="-mx-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
        </SlButton>
      </div>
    </div>
  )
}

export default LixFloat;
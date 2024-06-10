import {Theme} from "~/services/theme.server";
import {useFetcher, useFetchers} from "@remix-run/react";
import {getFormProps, useForm} from "@conform-to/react";
import {Laptop, Moon, Sun} from "lucide-react";
import {action} from "~/root";
import z from "zod";
import {parseWithZod} from "@conform-to/zod";

export const ThemeFormSchema = z.object({
    theme: z.enum(['system', 'light', 'dark'])
})


export function useOptimisticThemeMode() {
    const fetchers = useFetchers()
    const themeFetcher = fetchers.find(f => f.formAction === '/')


    if (themeFetcher && themeFetcher.formData) {
        const submission = parseWithZod(themeFetcher.formData, {
            schema: ThemeFormSchema
        })

        if (submission.status === 'success') {
            return submission.value.theme
        }
    }
}


export function ThemeSwitch({userPreference}: { userPreference?: Theme | null }) {
    const fetcher = useFetcher<typeof action>()

    const [form] = useForm({
        id: 'theme-switch',
        lastResult: fetcher.data?.result
    })

    const optimisticMode = useOptimisticThemeMode()

    const mode = optimisticMode ?? userPreference ?? 'system'
    const nextMode =
        mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system'
    const modeLabel = {
        light: <Moon size={20}/>,
        dark: <Sun size={20}/>,
        system: <Laptop size={20}/>
    }

    return (
        <fetcher.Form method="post" action="/" {...getFormProps(form)}>
            <input type='hidden' name='theme' value={nextMode}/>
            <div className='flex gap-2'>
                <button
                    type='submit'
                    className='flex h-8 w-8 cursor-pointer items-center justify-center'
                >
                    {modeLabel[mode]}
                </button>
            </div>
        </fetcher.Form>
    )
}

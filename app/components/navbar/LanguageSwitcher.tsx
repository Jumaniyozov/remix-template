import {Link, useFetcher, useLocation} from "@remix-run/react";
import {useTranslation} from "react-i18next";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select";

export function Logo() {
    const fetcher = useFetcher({key: "change-lang"});
    const {t, i18n} = useTranslation('general');
    const location = useLocation();


    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value);

        fetcher.submit({
            language: value,
            intent: 'language',
            url: location.pathname,
        }, {method: "post", action: '/language'});
    }

    return (
        <div className="col-start-1 col-span-3 h-full flex items-center gap-4">
            <Link to='/' className='flex gap-4 items-center'>

                <h3 className='font-semibold'>Mening-hududim.mc.uz</h3>
            </Link>
            <fetcher.Form method="post" action='/language'>
                <Select onValueChange={handleLanguageChange} defaultValue={i18n.language}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tilni tanlang"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{t('language.chooseLanguage')}</SelectLabel>
                            <SelectItem value="uz">{`O'zbekcha`}</SelectItem>
                            <SelectItem value="ru">Русский</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </fetcher.Form>
        </div>
    );
}
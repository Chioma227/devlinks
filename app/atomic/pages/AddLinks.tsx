import { useEffect, useState } from "react"
import ButtonComponent from "../atoms/Button"
import Empty from "@/app/components/common/Empty"
import LinkTemplate from "../templates/LinkTemplate"
import { useLinkStore } from "@/zustand/useLinkStore"
import { buttonVariants } from "@/app/variants/variants"


const AddLinks = () => {
    //states
    const {links, loadLinks} = useLinkStore()
    const [icon, setIcon] = useState<string>('');
    const [newLink, setNewLink] = useState<string>('');
    const [platform, setPlatform] = useState<string>('');
    const [platformColor, setPlatformColor] = useState<string>('');

    const {
        isLoading,
        linkInputs,
        addLinkInput,
        addLink,
        handleRemove,
        handleInputChange,
    } = useLinkStore();


    //platform select change handler
    const handleSelectChange = (value: string, icon: string, color: string) => {
        setIcon(icon)
        setPlatform(value)
        setPlatformColor(color)
    };

    //link input change handler
    const handleInputChangeWrapper = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleInputChange(index, name, value);
    };

    //handle remove link and input
    const handleRemoveWrapper = (linkId: string) => {
        handleRemove(linkId);
    };

    //add link
    const handleFormSubmit = async () => {
        try {
            await addLink(linkInputs.length - 1, { icon: icon, newLink: newLink, platform: platform, platformColor: platformColor });

        } catch (error) {
            console.error('Error adding link:', error);
        }
    };

    useEffect(() => {
        loadLinks()
      }, [links]);

    return (
        <>
            <header className='mb-[40px]'>
                <h3 className='sm:text-[32px] text-[24px] text-dark_grey font-bold mb-[8px] m-0'>Customize your links</h3>
                <p className='text-grey text-[15px]'>Add/edit/remove links below and then share all your profiles with the world</p>
            </header>
            <section>
                <ButtonComponent isDisabled={links.length === 5} onClick={addLinkInput} variant={buttonVariants.OUTLINE_FULL} className="mb-[24px]">
                    + Add newLink
                </ButtonComponent>
            </section>
            <div>
                {linkInputs.length === 0 ?
                    <Empty /> :
                    <div>
                        {linkInputs.map((link, index) => {
                            return <LinkTemplate
                                key={index}
                                id={index + 1}
                                value={link.newLink}
                                isDisabled={link.isDisabled}
                                handleSelect={handleSelectChange}
                                isSelectDisabled={link.isDisabled}
                                onChange={handleInputChangeWrapper(index)}
                                // handleRemove={() => handleRemoveWrapper(index)}
                            />
                        })
                        }
                    </div>}
            </div>

            <section className=" mt-auto border-t-[1px] border-t-border pt-[15px] flex items-center justify-end px-[10px]">
                <ButtonComponent onClick={handleFormSubmit} variant={buttonVariants.FILLED_FIT}>
                    {isLoading ? "Adding..." : "Save"}
                </ButtonComponent>
            </section>
        </>
    )
}

export default AddLinks




import ButtonComponent from "../atoms/Button"
import { buttonVariants } from "@/app/variants/variants"
import Empty from "@/app/components/common/Empty"
import LinkTemplate from "../templates/LinkTemplate"
import { useLinkStore } from "@/zustand/useLinkStore"
import { useEffect, useState } from "react"
import platformColors from "@/app/data/platformColors"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/firebaseConfig"


interface LinkInput {
    platform: string;
    url: string;
}

const AddLinks = () => {
    const [icon, setIcon] = useState<string>('');
    const [newLink, setNewLink] = useState<string>('');
    const [platform, setPlatform] = useState<string>('');
    const [platformColor, setPlatformColor] = useState<string>('');
    const [linkInputs, setLinkInputs] = useState<LinkInput[]>([{ platform: '', url: '' }]);

    const { links, addLink, message, isLoading, removeLink } = useLinkStore();

    const handleRemoveInput = (index: number) => {
        const newLinkInputs = linkInputs.filter((_, i) => i !== index);
        setLinkInputs(newLinkInputs);
    };

    const handleAddInput = () => {
        setLinkInputs([...linkInputs, { platform: '', url: '' }]);
    };

    const handleSelectChange = (value: string, icon: string, color: string) => {
        setIcon(icon)
        setPlatform(value)
        setPlatformColor(color)
        console.log('Selected:', value, icon, color);
    };




    const handleDelete = async (id: string) => {
        try {
            const idString = id.toString();
          const inputElement = document.getElementById(idString);
          if (inputElement) {
            inputElement.remove();
          }
      
          // Delete Firestore document
          const docRef = doc(db, 'links', id);
          await deleteDoc(docRef);
      
          // Delete localStorage item
          localStorage.removeItem(id);
      
          // Handle success, e.g., show a success message
          console.log('Item deleted successfully');
        } catch (error) {
          // Handle error, e.g., show an error message
          console.error('Error deleting item:', error);
        }
      };




    const handleAddLink = async () => {
        if (newLink.trim() === '' || platform.trim() === '') return;
        await addLink(newLink, platform, platformColor, icon)
        setNewLink('');
        setPlatform('');
    };

    useEffect(() => {
        console.log(links);
    }, [links])

    return (
        <>
            <header className='mb-[40px]'>
                <h3 className='sm:text-[32px] text-[24px] text-dark_grey font-bold mb-[8px] m-0'>Customize your links</h3>
                <p className='text-grey text-[15px]'>Add/edit/remove links below and then share all your profiles with the world</p>
            </header>
            {message && <span>{message}</span>}
            <section>
                <ButtonComponent onClick={handleAddInput} variant={buttonVariants.OUTLINE_FULL} className="mb-[24px]">
                    + Add newLink
                </ButtonComponent>
            </section>
            <div>
                {linkInputs.length === 0 ?
                    <Empty /> :
                    <div>
                        {linkInputs.map((link, index) => {
                            return <LinkTemplate
                                id={index + 1}
                                handleSelect={handleSelectChange}
                                onChange={(e) => setNewLink(e.target.value)}
                                key={index}
                                // readOnly={true}
                                handleRemove={() => handleDelete(index.toString())}
                                value={link.url}
                            />
                        })
                        }
                    </div>}
            </div>

            <section className=" mt-auto border-t-[1px] border-t-border pt-[15px] flex items-center justify-end px-[10px]">
                <ButtonComponent onClick={handleAddLink} variant={buttonVariants.FILLED_FIT}>
                    {isLoading ? "Adding..." : "Save"}
                </ButtonComponent>
            </section>

        </>
    )
}

export default AddLinks











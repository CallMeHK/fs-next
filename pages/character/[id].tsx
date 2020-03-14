import { NextPage, GetServerSideProps} from 'next/types'

const CharacterById: NextPage<{id: string}> = ({ id }) => <h2>CharacterById: {id}</h2>

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    return {
        props: {
            id: params.id
        }
    }
}


export default CharacterById
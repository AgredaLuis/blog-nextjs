

interface Props {
  email: string;
  date: number;
  mongoId: string;
  deleteEmail: (mongoId: string) => void;
}

const SubsTableItem = ({email, date, mongoId, deleteEmail} : Props) => {

  const emailDate = new Date(date)
  return (
    <tr className="bg-white border-b text-left">
        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            {email ? email : "No Email"}
        </th>
        <td className="py-4 px-6 hidden sm:block">{emailDate.toDateString()}</td>
        <td className="py-4 px-6 cursor-pointer" onClick={() => deleteEmail(mongoId)}>x</td>
    </tr>
  )
}

export default SubsTableItem
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserById } from "../services/userApi";
import { useParams } from "react-router-dom";
import { images } from "../constants";

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useQuery({
    queryFn: () => {
      return getUserById({ id });
    },
    queryKey: ["user", id],
  });
  console.log(user);
  return (
    <div className=" flex flex-col  h-screen w-full  flex-1  custom-scrollbar overflow-scroll  p-14   ">
      <div className=" px-14 py-8 flex flex-col sm:flex-row justify-center gap-5 sm:justify-between ">
        <div>
          <h1>User profile</h1>
        </div>
        <button>Edit</button>
      </div>
      <div className="flex flex-col xl:flex-row mt-10 gap-6 xl:px-20  ">
        {/* left */}
        <div
          className="mx-auto flex p-8 xs:mb-2    pb-4 rounded xl:flex flex-col gap-5  sm:shadow-md
                h-fit w-[100%] md:w-[90%] min-h-[430px]  xl:min-w-[20%] xl:w-fit    xl:p-5 xl:sticky xl:top-8 border-2 items-center  "
        >
          <img
            src={user?.profile?.photo || images.ProfileImage}
            alt="avatar"
            className="w-48 h-auto"
          />
          <div className="flex gap-x-1 font-semibold text-xl text-slate-800">
            <span>{user?.first_name}</span>
            <span>{user?.last_name}</span>
          </div>
          <span>{user?.role}</span>
          <span>{user?.role}</span>
        </div>

        <div className=" flex gap-12  h-auto  flex-col-reverse w-[100%] md:w-[90%]  xl:flex-row mx-auto  sm:shadow-sm">
          <div className="flex flex-col  gap-5 flex-grow px-2 xl:px-14 py-8 flex-1 h-auto border-2  ">
            <h2>Introduction</h2>

            <div
              className=" flex  xs:mb-2  w-full  pb-4 rounded xl:flex  gap-5 
                h-fit  xl:min-w-[100%] xl:w-fit    xl:p-5    "
            >
              <table className=" table-auto w-full  mt-2 rounded   border-separate border-spacing-y-10 ">
                <tbody className="">
                  <tr className="">
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      first name
                    </th>
                    <th scope="col" className="w-3/4 border-b pb-3">
                      {user?.first_name}
                    </th>
                  </tr>

                  <tr>
                    <th
                      scope="col"
                      className="text-base lg:text-xs text-slate-600 font-semibold w-1/4 border-b pb-3"
                    >
                      last name
                    </th>
                    <th scope="col" className="w-1/2  border-b pb-3">
                      {user?.last_name}
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      email
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold "
                    >
                      <div
                        className={
                          "inline-block  rounded-full text-base lg:text-xs text-slate-800 font-bold uppercase mr-2  "
                        }
                      >
                        {user?.email}
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      gedner
                    </th>
                    <th scope="col" className="w-1/2  border-b pb-3 ">
                      <span
                        className={
                          "inline-block  text-slate-800  rounded-full lg:text-sm font-semibold uppercase mr-2 "
                        }
                      >
                        Male
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      joined
                    </th>
                    <th scope="col" className="w-1/2  border-b pb-3">
                      <div className="flex flex-col">
                        <div className="inline-block  text-slate-800  rounded-full lg:text-sm font-semibold uppercase mr-2 ">
                          <span>
                            {" "}
                            {new Date(user?.profile?.created).toLocaleString(
                              "en-US",
                              {
                                month: "long",
                              }
                            )}{" "}
                            {new Date(user?.profile?.created).getDate()},{" "}
                            {new Date(user?.profile?.created).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-5">
              <h2>bio</h2>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                voluptatum pariatur earum fugiat unde tempore illo aut ducimus
                repudiandae. Nemo dignissimos asperiores error? Tenetur quam,
                quae ea possimus perferendis optio? Ab perspiciatis placeat hic
                quaerat, aspernatur eos velit ipsum ipsam, nostrum dolor
                laudantium itaque animi iste blanditiis ducimus? Tenetur quod
                illo numquam accusamus vel, vitae officia recusandae amet aut
                laborum. Labore nemo alias nihil enim, commodi cumque pariatur,
                tempora magni quia ab, natus quasi corrupti. Tempore quidem ex
                porro vel. Autem fuga qui nam sequi quam praesentium dolorem
                voluptatum dignissimos! Ipsa cumque odit corporis veniam
                obcaecati? Odio deleniti saepe incidunt perferendis minima modi
                reiciendis accusamus quisquam iusto, quam, dolorum est quis,
                unde non architecto assumenda suscipit adipisci? Numquam,
                mollitia eveniet! Tempore veniam facilis ullam nisi officiis
                numquam doloremque tenetur magni dignissimos amet. Sunt aut
                doloribus libero ex mollitia minima cumque iste, nulla
                reprehenderit quia fugit, dignissimos animi distinctio
                molestiae! Doloribus. Adipisci dolorem iure ipsum error velit
                placeat eligendi fugiat nesciunt cum sed voluptatem distinctio
                illum obcaecati excepturi rerum provident ipsam cupiditate eius
                dicta, quod unde libero, totam quam non! Facere. Doloremque eius
                sit adipisci voluptatem sed, nemo possimus aliquam atque error
                fugiat facilis, odit exercitationem, dolore reiciendis odio
                temporibus commodi soluta explicabo enim? Quasi numquam libero
                deleniti unde dignissimos! Neque. Accusamus ex possimus
                voluptatibus cum, expedita neque incidunt delectus repellendus
                doloremque quae sint eum odit impedit dignissimos officiis
                voluptas est sunt commodi mollitia a. Magni corrupti laborum
                sunt explicabo nemo? Ullam consequatur porro blanditiis!
                Repellat eligendi magni libero rerum quaerat unde cupiditate,
                officia dignissimos delectus aut nisi ullam saepe neque,
                pariatur beatae a facilis possimus tempore. Laudantium error a
                provident. Placeat nesciunt a illo consequuntur velit. Cum,
                cumque nesciunt excepturi tempora modi sequi eaque vel,
                aspernatur, id est animi earum ea consequatur in commodi nam
                enim pariatur maxime ut voluptatibus! Itaque similique
                voluptatum facere excepturi, laborum sapiente voluptatem! Odit,
                ex? Vel harum vero totam ad corrupti odit mollitia non, magnam
                nam. Aut officia quam nihil, facere alias reiciendis inventore
                voluptates! Ipsum nemo cupiditate exercitationem velit rem
                dolor, eum repellendus neque distinctio fugit excepturi enim,
                assumenda minus aut aspernatur aliquid. Dolore deserunt nostrum
                modi quas eaque perspiciatis nobis nemo minima ut. Enim pariatur
                sed aut consectetur, eum nulla illo facilis vero hic excepturi
                libero quos vitae aliquid, modi laborum, quam repudiandae.
                Molestiae sunt vel hic rerum, nihil atque sint corrupti officia!
                Repudiandae maxime minus et architecto ipsum cupiditate
                accusamus magni laborum eos assumenda, quis dicta culpa nisi
                esse est ducimus possimus quisquam beatae necessitatibus
                repellendus non laudantium nobis. Minus, optio saepe? Aperiam
                repellat doloremque consequuntur vel suscipit iure nobis
                excepturi nihil deleniti. Velit praesentium, saepe doloribus,
                unde obcaecati nulla ipsum iste accusamus dicta possimus,
                debitis error molestiae! Illum beatae accusantium similique.
                Quae consequuntur temporibus distinctio a, exercitationem magni
                explicabo molestiae quibusdam dolor non earum quis minus
                necessitatibus corporis dicta! Vitae necessitatibus dicta
                repudiandae a corporis commodi dolorem excepturi similique
                corrupti itaque. Obcaecati, voluptates repudiandae fugiat autem
                vero unde natus asperiores maiores a blanditiis nostrum error
                placeat doloremque debitis saepe facere dolorem voluptate
                commodi accusamus? Facere at reiciendis dicta. Voluptatum, quam
                et? Commodi eius ullam suscipit. Eveniet neque, rem enim ut
                voluptas placeat, dignissimos minima maiores, autem soluta
                dolorem fugiat eligendi dolor voluptatum culpa. Quam doloribus
                sapiente qui molestiae, ab odio consequuntur. Fugiat totam
                deserunt, quasi magnam aut architecto in amet excepturi facere a
                eos adipisci cumque ex labore aperiam quae ipsam.
                Necessitatibus, veritatis ipsam provident unde cumque
                consectetur saepe eum ad! Dolor, accusantium illo ipsa mollitia
                laborum ut sint et consequatur nemo vitae perferendis est
                officiis id dolores optio quibusdam deserunt quod? Harum sit
                aliquam dolorem hic libero, illum quasi deserunt!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

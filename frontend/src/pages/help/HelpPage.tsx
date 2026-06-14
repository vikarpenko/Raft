import './HelpPage.css';
import {FaqItem} from "@/pages/help/FeqItem.tsx";

const FAQ_ITEMS = [
    {
        question: 'How do shared expenses work?',
        answer: 'In a shared workspace, open the Expenses tab and click "+ Add expense". Choose who participates — the cost splits equally between selected members.',
    },
    {
        question: 'Рецепт панкейків',
        answer: 'Інгредієнти' +
            '\n200 мл молока 2,5%' +
            '\n200 г борошна ' +
            '\n1 яйце ' +
            '\n1 ст. л. цукру ' +
            '\n50 г вершкового масла ' +
            '\n0,5 ч. л. розпушувача ' +
            '\n50 мл меду для подачі\n' +
            '\nКРОК 1: Дістаньте з холодильника молоко, щоб воно трохи нагрілося. У глибоку миску вбийте 1 яйце, додайте столову ложкою цукру і збийте за допомогою віничка або блендера з цією насадкою.' +
            '\nКРОК 2: Додайте 200 мл молока кімнатної температури, продовжуючи збивати.' +
            '\nКРОК 3: Змішайте 200 г борошна з ½ ч. л. розпушувача, додайте у молочно-яєчну суміш і знову ретельно збийте.' +
            '\nКРОК 4: Розтопіть 50 г масла зручним для вас способом - на маленькому вогні, водяній бані чи у мікрохвильовці. Влийте у тісто та добре розмішайте до повного поглинання. У вас має вийти однорідне тісто, приблизно як сметана середньої густини. Накрийте миску плівкою і поставте холодильника на 20 хв.' +
            '\nКРОК 5: Вийміть охолоджене тісто, коли поставите пательню розігріватися. Виливайте суміш ополоником в центр розігрітої сковорідки. Смажте з обох боків до золотистої кірочки. Викладайте гіркою, поливайте медом чи кленовим сиропом і подавайте до столу.',
    },
    {
        question: 'Видри та камінці',
        answer: 'Раніше біологи припускали, що подібні ігри допомагають видрам відточувати свої навички у видобутку їжі з раковин молюсків. Однак нове дослідження показало цікаву закономірність, яка ставить під питання попереднє припущення. Річ у тім, що молодняк і старі видри частіше жонглювали камінням, ніж дорослі особини репродуктивного віку, але при цьому не демонстрували більшої спритності при відкриванні раковин.' +
            '\nНа думку авторів дослідження, гра з камінчиками висловлює хвилювання і нетерплячість тварин в очікуванні годування. Видри набагато частіше перекочують і підкидають камені саме тоді, коли голодні.',
    },
    {
        question: 'Що таке адронний колайдер',
        answer: ' Це найбільший у світі прискорювач елементарних частинок. Його головна мета — розігнати протони або важкі іони майже до швидкості світла та зіштовхнути їх між собою, щоб вивчити фундаментальні закони фізики та структуру матерії.',
    },
    {
        question: 'Interesting facts about Twilight',
        answer: 'Emmett has a bag of eggs in the cafeteria scene. Completely random and it was actually the actor’s lunch that day. So he’s just carrying a plastic bag with like probably 10 hard boiled eggs' +
            '\nRosalie is wearing the random leather glove to cook dinner because the actress had actually cut her hand in a previous take of smashing the bowl.',
    },
];

export function HelpPage() {
    return (
        <div className="help">

            <section className="help__contact">
                <p className="help__contact-label">Need more help?</p>
                <a href="mailto:help@gmail.com" className="help__contact-email">
                    help@gmail.com
                </a>
            </section>

            <section className="help__faq">
                <h2 className="help__section-title">Frequently asked questions</h2>
                <div className="help__faq-list">
                    {FAQ_ITEMS.map((item) => (
                        <FaqItem key={item.question} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </section>
        </div>
    );
}

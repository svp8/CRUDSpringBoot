package com.vlad.documents.configs;

import com.vlad.documents.models.Events;
import com.vlad.documents.models.States;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.statemachine.config.EnableStateMachine;
import org.springframework.statemachine.config.EnumStateMachineConfigurerAdapter;
import org.springframework.statemachine.config.builders.StateMachineConfigurationConfigurer;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.listener.StateMachineListener;
import org.springframework.statemachine.listener.StateMachineListenerAdapter;
import org.springframework.statemachine.state.State;
import org.springframework.statemachine.transition.Transition;

import java.util.Optional;
@Slf4j
@Configuration
@EnableStateMachine
public class StateMachineConfig
        extends EnumStateMachineConfigurerAdapter
        <States, Events> {

    @Override
    public void configure(
            StateMachineConfigurationConfigurer
                    <States, Events> config) throws Exception {

        config.withConfiguration()
                .autoStartup(true);
    }
    private StateMachineListener<States, Events> listener() {
        return new StateMachineListenerAdapter<States, Events>(){
            @Override
            public void transition(Transition<States, Events> transition) {
                log.warn("move from:{} to:{}",
                        ofNullableState(transition.getSource()),
                        ofNullableState(transition.getTarget()));
            }

            @Override
            public void eventNotAccepted(Message<Events> event) {
                log.error("event not accepted: {}", event);
            }

            private Object ofNullableState(State s) {
                return Optional.ofNullable(s)
                        .map(State::getId)
                        .orElse(null);
            }
        };}

    @Override
    public void configure(
            StateMachineStateConfigurer<States, Events> states)
            throws Exception {

        states.withStates()
                .initial(States.PREPARATION)
                .state(States.EXECUTION)
                .state(States.CONTROL)
                .state(States.MODIFICATION)
                .end(States.ACCEPTION);
    }

    @Override
    public void configure(
            StateMachineTransitionConfigurer<States, Events> transitions)
            throws Exception {

        transitions.withExternal()
                .source(States.PREPARATION)
                .target(States.EXECUTION)
                .event(Events.START_EXECUTION)
                .and()
                .withExternal()
                .source(States.EXECUTION)
                .target(States.CONTROL)
                .event(Events.FINISH_EXECUTION)
                .and()
                .withExternal()
                .source(States.CONTROL)
                .target(States.ACCEPTION)
                .event(Events.APPROVE_ORDER)
                .and()
                .withExternal()
                .source(States.CONTROL)
                .target(States.MODIFICATION)
                .event(Events.DENY_ORDER)
                .and()
                .withExternal()
                .source(States.MODIFICATION)
                .target(States.EXECUTION)
                .event(Events.START_EXECUTION);

    }
}